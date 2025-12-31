// transliterate.js
import Sanscript from "@indic-transliteration/sanscript";

export const toHindi = (text) => {
  try {
    return Sanscript.t(text, "hk", "devanagari");
  } catch {
    return text;
  }
};
