import { Slider } from "@/components/ui/slider";
import { useState, type FC } from "react";

interface FilterCategorySliderProps {
  label: string;
  defaultValue: number; // Default value for slider
  name: string; // Value to be used as name property on the input
  min?: number;
  max?: number;
  step?: number;
}

const FilterCategorySlider: FC<FilterCategorySliderProps> = ({
  label,
  defaultValue,
  name,
  min = 0,
  max = 100,
  step = 1,
}) => {
  const [bedrooms, setBedrooms] = useState<number>(defaultValue);
  const [inputValue, setInputValue] = useState<string>(defaultValue.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);

    const parsed = parseInt(value, 10);
    if (!isNaN(parsed)) {
      setBedrooms(parsed);
    }
  };

  const handleSliderChange = (val: number[]): void => {
    setBedrooms(val[0]);
    setInputValue(String(val[0]));
  };

  return (
    <div className="w-full flex flex-col gap-3 box-border">
      <div className="w-full flex justify-between">
        <label htmlFor={name} className="font-bold">
          {label}
        </label>
        <input
          id="bedrooms"
          type="number"
          name={name}
          min={min}
          max={max}
          step={step}
          className="w-16 rounded-md border-2 border-black text-right"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex-1">
        <Slider
          className="h-full"
          value={[bedrooms]}
          onValueChange={handleSliderChange}
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  );
};
export default FilterCategorySlider;
