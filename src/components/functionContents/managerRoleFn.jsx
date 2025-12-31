import { toHindi } from "../../utils/transliterate";

export const InputCell = ({
  value = "",
  placeholder,
  lang = "en",
  onChangeValue,
}) => {
  const isHindi = lang === "hi";

  const handleChange = (e) => {
    const typedValue = e.target.value;

    // 🔥 Auto convert ONLY for Hindi
    const finalValue = isHindi ? toHindi(typedValue) : typedValue;

    onChangeValue(finalValue);
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      lang={lang}
      style={{
        width: "100%",
        padding: "10px 12px",
        border: "1px solid #cbd5e0",
        borderRadius: "6px",
        fontSize: "14px",
        fontFamily: isHindi
          ? "Noto Sans Devanagari, Mangal, sans-serif"
          : "inherit",
      }}
    />
  );
};
