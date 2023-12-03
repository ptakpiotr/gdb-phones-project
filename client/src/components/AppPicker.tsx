import { ChangeEvent } from "react";
import { Select } from "@chakra-ui/react";

interface IProps<T extends { id: string }> {
  options: T[];
  renderValue: (v: T) => string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  title: string;
}

function AppPicker<T extends { id: string }>({
  options,
  renderValue,
  onChange,
  title,
}: IProps<T>) {
  return (
    <Select placeholder={title ?? "Picker"} onChange={onChange}>
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {renderValue(o)}
        </option>
      ))}
    </Select>
  );
}

export default AppPicker;
