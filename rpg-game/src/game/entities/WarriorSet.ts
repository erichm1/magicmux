import { Item, ItemType, HeroClass } from "./Item";

export const WarriorSet = [
  new Item("Titan Sword", ItemType.Weapon, HeroClass.Warrior, 50, 0, 2),
  new Item("Titan Armor", ItemType.Armor, HeroClass.Warrior, 0, 60, 2),
  new Item("Titan Helmet", ItemType.Helmet, HeroClass.Warrior, 0, 30, 1),
  new Item("Titan Boots", ItemType.Boots, HeroClass.Warrior, 0, 20, 1),
  new Item("Titan Shield", ItemType.Shield, HeroClass.Warrior, 0, 50, 1),
];
