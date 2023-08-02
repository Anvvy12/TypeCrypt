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
      defaultValue={value}
      onChange={handleChange}
      name={name}
    />
  );
};

export default Input;
