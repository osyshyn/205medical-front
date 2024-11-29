import { ILocation } from "src/@types/users";
import { LOCATION_DATA } from "../constants";

const DATA_NAME = "Locations";
const SAVE_KEY = "locations";
const DELAY_NUMBER = 2500;

const delay = () => new Promise((resolve) => setTimeout(resolve, DELAY_NUMBER));

class Data {
  private items: ILocation[];

  constructor() {
    this.items = this.load();
    console.log(`${DATA_NAME}s loaded:`, this.items);
  }

  private load(): ILocation[] {
    const items = localStorage.getItem(SAVE_KEY);
    console.log(`Loading ${DATA_NAME} from localStorage`);

    try {
      const parsedItems = items ? JSON.parse(items) : null;
      return Array.isArray(parsedItems) && parsedItems.length > 0
        ? parsedItems
        : LOCATION_DATA;
    } catch {
      return LOCATION_DATA;
    }
  }

  private save(): void {
    localStorage.setItem(SAVE_KEY, JSON.stringify(this.items));
    console.log(`${DATA_NAME}s saved to localStorage:`, this.items);
  }

  public async getAll(): Promise<ILocation[]> {
    await delay();

    console.log(`Getting ${DATA_NAME}s:`, this.items);

    return this.items;
  }

  public async getById(itemSlug: string): Promise<ILocation> {
    await delay();

    const itemById = this.items.find(
      (currentItem) => currentItem.slug === itemSlug
    );

    if (!itemById) {
      console.error(`${DATA_NAME} with this slug not found:`, itemSlug);
      throw new Error();
    }

    console.log(`Getting ${DATA_NAME}s by slug: `, itemById);

    return itemById;
  }

  public async add(item: ILocation): Promise<ILocation> {
    await delay();

    const isItemExisted = this.items.find(
      (currentItem) => currentItem.slug === item.slug
    );
    if (isItemExisted) {
      console.error(`${DATA_NAME} with this SLUG already exists: `, item.slug);
      throw new Error();
    }

    this.items.push(item);
    this.save();

    console.log(`${DATA_NAME} added: `, item);
    return item;
  }

  public async update(
    itemSlug: string,
    updatedItem: Partial<ILocation>
  ): Promise<ILocation> {
    await delay();

    const itemIndex = this.items.findIndex((item) => item.slug === itemSlug);

    if (itemIndex === -1) {
      console.error(`${DATA_NAME} with this slug not found:`, itemSlug);
      throw new Error(`${DATA_NAME} with slug "${itemSlug}" not found.`);
    }

    this.items[itemIndex] = { ...this.items[itemIndex], ...updatedItem };
    this.save();

    console.log(`${DATA_NAME} updated:`, this.items[itemIndex]);

    return this.items[itemIndex];
  }

  public async remove(itemSlug: string): Promise<string> {
    await delay();

    console.log(`Removing ${DATA_NAME.toLowerCase()} with id: `, itemSlug);

    this.items = this.items.filter((item) => item.slug !== itemSlug);
    this.save();

    return itemSlug;
  }

  public clear(): void {
    console.log(`Clearing all ${DATA_NAME.toLowerCase()} s`);
    this.items = [];
    this.save();
  }
}

export const fakeLocations = new Data();

// fakeLocations.clear();
