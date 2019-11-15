function* triangles() {
    let list = [1];
    let tem = [];
    while (true) {
        yield list;
        for (let i = 0; i < list.length - 1; i++) {
            tem[i] = list[i + 1] + list[i]
        }
        list = [1].concat(tem).concat([1])
    }
}
const it = triangles();
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);