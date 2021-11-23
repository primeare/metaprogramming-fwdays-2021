import { Buffer } from 'buffer';

const isAlphaNumeric = (charCode) => {
  return (
    (charCode > 96 && charCode < 123) || // lower alpha (a-z)
    (charCode > 64 && charCode < 91)  || // upper alpha (A-Z)
    (charCode > 47 && charCode < 58)     // numeric (0-9)
  );
};

const PARSER_MODE = {
  ARGUMENT: 'argument',
  MULTILINE_ANNOTATION: 'multiline annotation',
  MULTILINE_ANNOTATION_END: 'multiline annotation end',
  LINE_ANNOTATION: 'line annotation',
  LINE_ANNOTATION_END: 'line annotation end',
};

const CHAR = {
  LEFT_PARENTHESES: 40,
  RIGHT_PARENTHESES: 41,
  FORWARD_SLASH: 47,
  STAR: 42,
  CR: 13,
  LF: 10,
};

const PARSER_MODE_HANDLERS = {};

PARSER_MODE_HANDLERS[PARSER_MODE.ARGUMENT] = (ctx) => {
  if (ctx.charCode === CHAR.FORWARD_SLASH) {
    const nextCharCode = ctx.buffer[ctx.index + 1];

    if (nextCharCode === CHAR.STAR) {
      return PARSER_MODE.MULTILINE_ANNOTATION;
    }

    if (nextCharCode === CHAR.FORWARD_SLASH) {
      return PARSER_MODE.LINE_ANNOTATION;
    }
  }

  if (!ctx.isToken && isAlphaNumeric(ctx.charCode)) {
    ctx.tokenStart = ctx.index;
    ctx.isToken = true;
  } else if (ctx.isToken && !isAlphaNumeric(ctx.charCode)) {
    const token = ctx.buffer.toString(undefined, ctx.tokenStart, ctx.index);
    ctx.tokens.push({ type: 'argument', token });
    ctx.isToken = false;
  }

  return PARSER_MODE.ARGUMENT;
};

PARSER_MODE_HANDLERS[PARSER_MODE.MULTILINE_ANNOTATION] = (ctx) => {
  if (ctx.charCode === CHAR.STAR) {
    return PARSER_MODE.MULTILINE_ANNOTATION_END;
  }

  if (!ctx.isToken && isAlphaNumeric(ctx.charCode)) {
    ctx.tokenStart = ctx.index;
    ctx.isToken = true;
  } else if (ctx.isToken && !isAlphaNumeric(ctx.charCode)) {
    const token = ctx.buffer.toString(undefined, ctx.tokenStart, ctx.index);
    ctx.tokens.push({ type: 'annotation', token });
    ctx.isToken = false;
  }

  return PARSER_MODE.MULTILINE_ANNOTATION;
};

PARSER_MODE_HANDLERS[PARSER_MODE.MULTILINE_ANNOTATION_END] = (ctx) => {
  if (ctx.charCode === CHAR.FORWARD_SLASH) {
    return PARSER_MODE.ARGUMENT;
  }

  return PARSER_MODE.MULTILINE_ANNOTATION;
};

PARSER_MODE_HANDLERS[PARSER_MODE.LINE_ANNOTATION] = (ctx) => {
  if (ctx.charCode === CHAR.CR || ctx.charCode === CHAR.LF) {
    if (ctx.isToken) {
      const token = ctx.buffer.toString(undefined, ctx.tokenStart, ctx.index);
      ctx.tokens.push({ type: 'annotation', token });
      ctx.isToken = false;
    }

    return PARSER_MODE.ARGUMENT;
  }

  if (!ctx.isToken && isAlphaNumeric(ctx.charCode)) {
    ctx.tokenStart = ctx.index;
    ctx.isToken = true;
  } else if (ctx.isToken && !isAlphaNumeric(ctx.charCode)) {
    const token = ctx.buffer.toString(undefined, ctx.tokenStart, ctx.index);
    ctx.tokens.push({ type: 'annotation', token });
    ctx.isToken = false;
  }

  return PARSER_MODE.LINE_ANNOTATION;
};

const tokenize = (functionSourceCode) => {
  const buffer = Buffer.from(functionSourceCode);
  const bufferLength = buffer.length;
  let parserMode = PARSER_MODE.ARGUMENT;
  let handler = PARSER_MODE_HANDLERS[parserMode];

  const ctx = {
    charCode: 0,
    tokens: [],
    index: buffer.indexOf(CHAR.LEFT_PARENTHESES) + 1,
    isToken: false,
    tokenStart: 0,
    buffer,
  };

  let parenthesisBalanceCount = ctx.index > 0 ? 1 : 0;

  while (parenthesisBalanceCount > 0 && ctx.index < bufferLength) {
    ctx.charCode = ctx.buffer[ctx.index];
    handler = PARSER_MODE_HANDLERS[parserMode];
    parserMode = handler(ctx);

    if (ctx.charCode === CHAR.LEFT_PARENTHESES) {
      ++parenthesisBalanceCount;
    } else if (
      ctx.charCode === CHAR.RIGHT_PARENTHESES &&
      parserMode === PARSER_MODE.ARGUMENT
    ) {
      --parenthesisBalanceCount;
    }

    if (parenthesisBalanceCount === 0) break;
    ++ctx.index;
  }

  return ctx.tokens;
};

export const validate = (fn) => {
  const functionSourceCode = fn.toString();
  const tokens = tokenize(functionSourceCode);
  const annotations = tokens.filter(token => token.type === 'annotation');

  return (...args) => {
    if (args.some((arg, i) => typeof arg !== annotations[i].token)) {
      throw new Error('invalid arguments');
    }

    return fn(...args);
  };
}
