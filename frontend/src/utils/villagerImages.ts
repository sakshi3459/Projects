// Villager image URLs mapping
// Using placeholder images that can be replaced with actual character portraits

export const villagerImages: Record<string, string> = {
  // Bachelors
  'Shane': 'https://stardewvalleywiki.com/mediawiki/images/8/8b/Shane.png',
  'Alex': 'https://stardewvalleywiki.com/mediawiki/images/0/04/Alex.png',
  'Elliott': 'https://stardewvalleywiki.com/mediawiki/images/b/bd/Elliott.png',
  'Harvey': 'https://stardewvalleywiki.com/mediawiki/images/9/95/Harvey.png',
  'Sam': 'https://stardewvalleywiki.com/mediawiki/images/9/94/Sam.png',
  'Sebastian': 'https://stardewvalleywiki.com/mediawiki/images/a/a8/Sebastian.png',

  // Bachelorettes
  'Abigail': 'https://stardewvalleywiki.com/mediawiki/images/8/88/Abigail.png',
  'Emily': 'https://stardewvalleywiki.com/mediawiki/images/2/28/Emily.png',
  'Haley': 'https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png',
  'Leah': 'https://stardewvalleywiki.com/mediawiki/images/e/e6/Leah.png',
  'Maru': 'https://stardewvalleywiki.com/mediawiki/images/f/f8/Maru.png',
  'Penny': 'https://stardewvalleywiki.com/mediawiki/images/a/ab/Penny.png',

  // Town folk
  'Mayor Lewis': 'https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png',
  'Robin': 'https://stardewvalleywiki.com/mediawiki/images/1/1b/Robin.png',
  'Demetrius': 'https://stardewvalleywiki.com/mediawiki/images/f/f9/Demetrius.png',
  'Caroline': 'https://stardewvalleywiki.com/mediawiki/images/8/87/Caroline.png',
  'Marnie': 'https://stardewvalleywiki.com/mediawiki/images/5/52/Marnie.png',
  'Wizard': 'https://stardewvalleywiki.com/mediawiki/images/c/c7/Wizard.png',
  'Linus': 'https://stardewvalleywiki.com/mediawiki/images/3/31/Linus.png',
  'Pam': 'https://stardewvalleywiki.com/mediawiki/images/d/da/Pam.png',
  'Gus': 'https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png',
  'Clint': 'https://stardewvalleywiki.com/mediawiki/images/3/31/Clint.png',
  'Willy': 'https://stardewvalleywiki.com/mediawiki/images/8/82/Willy.png',
  'Pierre': 'https://stardewvalleywiki.com/mediawiki/images/7/7e/Pierre.png',
  'Jodi': 'https://stardewvalleywiki.com/mediawiki/images/4/41/Jodi.png',
  'Evelyn': 'https://stardewvalleywiki.com/mediawiki/images/8/8e/Evelyn.png',
  'George': 'https://stardewvalleywiki.com/mediawiki/images/7/78/George.png',
  'Krobus': 'https://stardewvalleywiki.com/mediawiki/images/7/71/Krobus.png',
  'Dwarf': 'https://stardewvalleywiki.com/mediawiki/images/e/ed/Dwarf.png',
  'Kent': 'https://stardewvalleywiki.com/mediawiki/images/9/99/Kent.png',
  'Jas': 'https://stardewvalleywiki.com/mediawiki/images/5/55/Jas.png',
  'Vincent': 'https://stardewvalleywiki.com/mediawiki/images/f/f1/Vincent.png',
  'Gunther': 'https://stardewvalleywiki.com/mediawiki/images/3/3d/Gunther.png',

  // Default
  'Everyone': 'https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png',
  'Villager': 'https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png',
}

export const getVillagerImage = (villagerName: string): string => {
  return villagerImages[villagerName] || villagerImages['Villager']
}

// Villager-specific color schemes
export const villagerColors: Record<string, string> = {
  'Shane': '#8B4513',
  'Abigail': '#9370DB',
  'Sebastian': '#2C3E50',
  'Penny': '#FFC0CB',
  'Harvey': '#4682B4',
  'Emily': '#FF69B4',
  'Haley': '#FFD700',
  'Sam': '#FF6347',
  'Elliott': '#CD853F',
  'Leah': '#228B22',
  'Alex': '#4169E1',
  'Maru': '#708090',
  'Mayor Lewis': '#8B4513',
  'Robin': '#CD853F',
  'Wizard': '#4B0082',
  'Linus': '#8B7355',
  'Krobus': '#1C1C1C',
  'Everyone': '#32CD32',
}

export const getVillagerColor = (villagerName: string): string => {
  return villagerColors[villagerName] || '#DAA520'
}
