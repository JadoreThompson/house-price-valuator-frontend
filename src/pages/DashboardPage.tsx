import FilterCategorySlider from "@/components/FilterCategorySlider";
import Gauge from "@/components/Gauge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UtilsManager } from "@/lib/UtilsManager";
import { type FC } from "react";

const PROPERTY_TYPES = [
  "semi-detached",
  "detached",
  "flats",
  "bungalows",
  "farms",
  "land",
  "park_homes",
] as const;

const ValuatorPage: FC = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <section className="flex-1 flex flex-center">
        <Gauge />
      </section>
      <aside className="bg-white shadow-lg w-[350px] h-full p-6 overflow-y-auto space-y-6">
        {/* Postcode Field */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="postcode"
            className="text-sm font-medium text-gray-700"
          >
            Postcode
          </label>
          <Input type="text" name="postcode" placeholder="Enter postcode" />
        </div>

        {/* Bedroom Slider */}
        <FilterCategorySlider
          label="Bedrooms"
          defaultValue={0}
          name="bedrooms"
        />

        {/* Bathroom Slider */}
        <FilterCategorySlider
          label="Bathrooms"
          defaultValue={0}
          name="bathrooms"
        />

        {/* Repeated Bedroom Slider Removed */}

        {/* Price Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="price" className="text-sm font-medium text-gray-700">
            Price
          </label>
          <Input type="number" name="price" placeholder="Enter price" />
        </div>

        {/* Property Type Dropdown */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="property-type"
            className="text-sm font-medium text-gray-700"
          >
            Property Type
          </label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {PROPERTY_TYPES.map((val, ind) => (
                  <SelectItem key={ind} value={val}>
                    {UtilsManager.toCamelCase(val)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </aside>
    </main>
  );
};

export default ValuatorPage;
