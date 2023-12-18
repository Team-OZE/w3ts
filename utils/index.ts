import { Timer } from "../handles/timer";

export * from "./color";

export async function sleep(howMuch: number): Promise<null> {
  return new Promise((resolve, reject) => {
    const t = Timer.create();
    t.start(howMuch, false, () => {
      t.destroy();
      resolve(null);
    });
  });
}

export function cutString(contents: string, LIMIT: number) {
  const res = [];
  const lb = contents.length;
  const l = utf8.len(contents);
  let currentCharIndex = 0;
  for (let i = 0; i < lb / LIMIT; i++) {
    const lastCharIndex =
      currentCharIndex > 0 ? currentCharIndex - 1 : currentCharIndex;
    const lastByteIndex = (i + 1) * LIMIT - 1;
    while (true) {
      if (currentCharIndex > l) {
        break;
      }
      const nextCharStartByteIndex = utf8.offset(
        contents,
        currentCharIndex + 1
      );
      if (nextCharStartByteIndex > lastByteIndex) break;
      else {
        currentCharIndex++;
      }
    }
    const firstByteZeroBasedIndex =
      utf8.offset(contents, lastCharIndex + 1) - 1;
    const lastByteZeroBasedIndex = utf8.offset(contents, currentCharIndex) - 1;

    res.push(
      contents.substring(firstByteZeroBasedIndex, lastByteZeroBasedIndex)
    );
  }
  return res;
}
