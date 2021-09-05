// TODO 現状使用してないのでどこかのタイミングで消す


// interface Comparable<T extends Comparable<T>> {
//     compareTo(other: T): number;
// }

// class Comparator {
//     static comparing<T extends Comparable<T>, P extends keyof T & Comparable<P>>(prop: P):
//      (t1: T, t2: T) => number {
//         return (t1: T, t2: T) => t1[prop].compareTo(t2[prop]);
//     }
// }
// sort(comparing(Profile.datetime))
// compareFn?: ((a: Profile, b: Profile) => number) | undefined


        // // TODO datetime.getTime() じゃないと比較できない？
        // .subscribe(profiles => this.profiles = profiles.orderBy('datetime'));


// 以下は https://kakkoyakakko2.hatenablog.com/entry/2018/08/05/003000 をほぼそのまま
export {};

declare global {
  interface Array<T> {
    /**
     * [拡張メソッド]
     * 指定したプロパティを元に昇順にソートします。
     * @param sortKeys 昇順キー
     * @return ソート後の配列
     */
    orderBy<K extends keyof T>(...sortKeys: K[]): T[];
  }
}

Array.prototype.orderBy = function<T, K extends keyof T>(...sortKeys: K[]): T[] {
  const items = this as T[];

  // ソートキーの指定がない場合は、Array.sort()を実行
  if (!Array.isArray(sortKeys) || sortKeys.length === 0)
    return items.sort();
  else {
    return items.sort((a, b) => compare(a, b, sortKeys));
  }
};

/**
 * ソート判定処理
 * 再帰的にsortKeysを処理して、ソート判定を行います
 */
function compare<T, K extends keyof T>(value1: T, value2: T, sortKeys: K[]): number {
  const key = sortKeys[0];
  const prop1 = value1[key];
  const prop2 = value2[key];

  if (prop1 === prop2) {
    if (sortKeys.length <= 1)
      return 0;
    else
      return compare(value1, value2, sortKeys.slice(1));
  } else {
    return (prop1 < prop2) ? -1 : 1;
  }
}
