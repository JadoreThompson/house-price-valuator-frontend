export class UtilsManager {
  static BASE_URL: string = import.meta.env.VITE_BASE_URL;
  static TX_PREFIX: string = import.meta.env.VITE_TXN_PREFIX;

  static toCamelCase(value: string): string {
    let delimitter: string = "";

    if (value.includes("_")) {
      delimitter = "_";
    } else if (value.includes("-")) {
      delimitter = "-";
    } else {
      return value;
    }

    return value
      .split(delimitter)
      .map((val) => val.charAt(0).toUpperCase() + val.slice(1))
      .join(" ");
  }

  static async sleep(ms: number = 1000): Promise<unknown> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
