import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const namedDigits = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
}

function parseCalibrationValueFrom (line: string | number) : number {
  const firstDigit = /^[A-z]*(\d)/.exec(line as string)?.[1] ?? 'x'
  let lastDigit = /[A-z\d]+(\d)[A-z]*$/.exec(line as string)?.[1] ?? 'x'
  if (firstDigit === 'x' && lastDigit === 'x') {
    return 0
  }
  if (lastDigit === 'x') {
    lastDigit = firstDigit
  }
  if (firstDigit === 'x') {
    return 0
  }
  return parseInt(firstDigit + lastDigit)
}

const namedEntries = Object.entries(namedDigits)

function replaceNumberWordsInString (str: string) {
  const source = str.split('')
  let forwardBuffer = ''
  let backwardsBuffer = ''
  while (source.length > 0) {
    forwardBuffer = forwardBuffer + source.shift()
    backwardsBuffer = (source.pop() ?? '') + backwardsBuffer
    namedEntries.forEach(([name, digit]) => {
      if (forwardBuffer.includes(name)) {
        forwardBuffer = forwardBuffer.replace(name, digit + name.charAt(name.length - 1))
      }
      if (backwardsBuffer.includes(name)) {
        backwardsBuffer = backwardsBuffer.replace(name, name.charAt(0) + digit)
      }
    })
  }
  let combinedBuffer = forwardBuffer + backwardsBuffer
  namedEntries.forEach(([name, digit]) => {
    if (combinedBuffer.includes(name)) {
      combinedBuffer = combinedBuffer.replace(name, digit as unknown as string)
    }
  })
  return combinedBuffer
}


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)

  const calibrationValues = lines
    .map(line => parseCalibrationValueFrom(line))

  const solution = calibrationValues.reduce((sum, line) => {
    return sum + parseCalibrationValueFrom(line)
  }, 0)

  return solution;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split('\n')
  .map(line => line.trim())
  .filter(line => line.length > 0)

const replacedLines = lines
  .map(line => replaceNumberWordsInString(line))

const calibrationValues = replacedLines
  .map(line => parseCalibrationValueFrom(line))

const solution = calibrationValues.reduce((sum, line) => {
  return sum + parseCalibrationValueFrom(line)
}, 0)

  return solution;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
