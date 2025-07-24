export class HallOfFame {
  candidate: String | null = null;
  number: Number | null = null;
  hallOfFame: Array<[string, number]> = [];

  constructor(candidate = null, number = null) {
    this.candidate = candidate;
    this.number = number;
  };

  get list() {
    // Sort from highest to lowest number
    const sortedHallOfFame = this.hallOfFame.sort((a, b) => b[1] - a[1]);

    const formattedHallOfFame = sortedHallOfFame.map(member => `${member[0]}: ${member[1]}`);

    return formattedHallOfFame;
  };

  add(candidate: string, number: number) {
    this.hallOfFame.push([candidate, number])
  }
};
