import { HallOfFame } from './HallOfFame';

describe('Hall of Fame', () => {
  it('should return the hall of fame from highest to lowest', () => {
    const hallOfFame = new HallOfFame()
    hallOfFame.add('John Doe', 87)
    hallOfFame.add('Jane Smith', 92)
    hallOfFame.add('William Skywalker', 100)
    expect(hallOfFame.list).toEqual([
      'William Skywalker: 100',
      'Jane Smith: 92',
      'John Doe: 87'
    ]);
  })
})
