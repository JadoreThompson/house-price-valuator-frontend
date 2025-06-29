import FilterCategorySlider from "@/components/FilterCategorySlider";
import Gauge from "@/components/Gauge";
import { Button } from "@/components/ui/button";
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
import { useState, type FC } from "react";

const PROPERTY_TYPES = [
  "semi-detached",
  "detached",
  "bungalows",
  "farms",
  "land",
  "park_homes",
] as const;

const ValuatorPage: FC = () => {
  const [degree, setDegree] = useState<number>(0);
  const [predictedPrice, setPredictedPrice] = useState<number | undefined>(
    undefined
  );

  // Form state
  const [postcode, setPostcode] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [price, setPrice] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [sqm, setSqm] = useState<string>("");
  const [receptions, setReceptions] = useState<number>(0);

  // Error state
  const [errorMessage, setErrorMessage] = useState<string>("");

  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
  });

  function sanitizeAndValidate(): boolean {
    const sanitizedPostcode = postcode.trim().toUpperCase();

    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/;
    if (!postcodeRegex.test(sanitizedPostcode)) {
      setErrorMessage("Invalid postcode format");
      return false;
    }

    if (!sanitizedPostcode) {
      setErrorMessage("Postcode is required");
      return false;
    }

    if (bedrooms < 1) {
      setErrorMessage("Bedrooms must be 0 or greater");
      return false;
    }

    if (bathrooms < 1) {
      setErrorMessage("Bathrooms must be 0 or greater");
      return false;
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setErrorMessage("Valid price is required");
      return false;
    }

    if (!sqm || isNaN(Number(sqm)) || Number(sqm) <= 0) {
      setErrorMessage("Valid square meters is required");
      return false;
    }

    if (!propertyType) {
      setErrorMessage("Property type is required");
      return false;
    }

    if (receptions < 0) {
      setErrorMessage("Receptions must be 0 or greater");
      return false;
    }

    setPostcode(sanitizedPostcode);
    return true;
  }

  async function submitRequest(): Promise<void> {
    setPredictedPrice(undefined);
    if (!sanitizeAndValidate()) return;

    const requestData = {
      postcode: postcode.trim().toUpperCase(),
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      price: Number(price),
      property_type: propertyType,
      sqm: Number(sqm),
      receptions: receptions,
    };

    try {
      const rsp = await fetch(UtilsManager.BASE_URL + "/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!rsp.ok) {
        throw new Error(`HTTP error! status: ${rsp.status}`);
      }

      const data = await rsp.json();
      setDegree(Math.min(180, 180 * data.score));
      setPredictedPrice(data.price);
    } catch (error) {
      setErrorMessage(`Error submitting request: ${error}`);
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <main className="flex-1 flex flex-center">
        <div className="flex-center flex-col">
          <div
            className={`transition-all duration-300 ease-in-out ${
              predictedPrice ? "mb-12" : "mb-0"
            }`}
          >
            <Gauge rotateDeg={degree} />
          </div>
          {predictedPrice && (
            <h3 className="mt-0 text-center transition-opacity duration-300 opacity-100">
              Predicted Price: {priceFormatter.format(predictedPrice)}
            </h3>
          )}
        </div>
      </main>
      <aside className="bg-white shadow-lg w-[350px] h-full p-6 overflow-y-auto space-y-6">
        {/* Postcode Field */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="postcode"
            className="text-sm font-medium text-gray-700"
          >
            Postcode
          </label>
          <Input
            type="text"
            name="postcode"
            placeholder="Enter postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
        </div>

        {/* Bedroom Slider */}
        <FilterCategorySlider
          label="Bedrooms"
          defaultValue={bedrooms}
          name="bedrooms"
          onChange={(value) => setBedrooms(value)}
        />

        {/* Bathroom Slider */}
        <FilterCategorySlider
          label="Bathrooms"
          defaultValue={bathrooms}
          name="bathrooms"
          onChange={(value) => setBathrooms(value)}
        />

        {/* Reception Slider */}
        <FilterCategorySlider
          label="Receptions"
          defaultValue={receptions}
          name="receptions"
          onChange={(value) => setReceptions(value)}
        />

        {/* Price Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="price" className="text-sm font-medium text-gray-700">
            Price
          </label>
          <Input
            type="number"
            name="price"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Square Meters Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="sqm" className="text-sm font-medium text-gray-700">
            Square Meters
          </label>
          <Input
            type="number"
            name="sqm"
            placeholder="Enter square meters"
            value={sqm}
            onChange={(e) => setSqm(e.target.value)}
          />
        </div>

        {/* Property Type Dropdown */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="property-type"
            className="text-sm font-medium text-gray-700"
          >
            Property Type
          </label>
          <Select value={propertyType} onValueChange={setPropertyType}>
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

        <Button className="w-full bg-black text-white" onClick={submitRequest}>
          Submit
        </Button>
        {errorMessage && (
          <div className="border border-red-500 bg-red-300/10 rounded-md text-center text-red-500 text-sm py-2">
            {errorMessage}
          </div>
        )}
      </aside>
    </div>
  );
};

export default ValuatorPage;
