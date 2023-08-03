import "./input.scss";

interface InputProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({
  value,
  handleChange,
  name,
  placeholder,
}) => {
  return (
    <input
      id="count"
      className="input"
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      value={value}
    />
  );
};

export default Input;
