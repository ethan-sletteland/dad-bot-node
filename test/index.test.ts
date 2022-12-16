import { server, Msg } from "../index"
import dadJokes from "../jokes.json"

describe('Server Tests', () => {

  test('Server initializes', () => {
    const result = server
    expect(result).toBeTruthy()
    server.close()
  })

  test('Type check', () => {
    const result: Msg = {name: "name", data: "data"}
    expect(result).toBeTruthy()
  })

  test('jokes length', () => {
    expect(dadJokes.length).toBe(89)
  })

})
