export class SearchService {

    public run() {
        const array = [800, 567, 13, 63, 33];
    
        const target = 63;
        const unexistingValue = -5;
    
        console.log(`search for: ${target}`)
    
        console.log(`== array: ${array} ==`);
    
        console.log(`linear search: ${this.linearSearch<number>(array, target)}`);
        console.log(`linear search: ${this.linearSearch<number>(array, unexistingValue)}`);
    
        console.log(`quick linear search: ${this.quickLinearSearch<number>(array, target)}`);
        console.log(`quick linear search: ${this.quickLinearSearch<number>(array, unexistingValue)}`);
    
        console.log(`linear search recursion: ${this.linearSearchRecursion<number>(array, target)}`);
        console.log(`linear search recursion: ${this.linearSearchRecursion<number>(array, unexistingValue)}`);
    
        array.sort((a, b) => a - b);
        console.log(`== array sorted: ${array} ==`);
    
        console.log(`binary search: ${this.binarySearch<number>(array, target)}`);
        console.log(`binary search: ${this.binarySearch<number>(array, unexistingValue)}`);
    
        console.log(`binary search recursion: ${this.binarySearchRecursion<number>(array, target)}`);
        console.log(`binary search recursion: ${this.binarySearchRecursion<number>(array, unexistingValue)}`);
    
      }
    
    
      private linearSearch<T>(array: T[], target: T): number {
        let index = -1;
    
        for (let i = 0; i < array.length; i++) {
          if (array[i] === target) {
            index = i;
            // continue even if target element is found
          }
        }
    
        return index;
      }
    
      private quickLinearSearch<T>(array: T[], target: T): number {
        let index = -1;
    
        for (let i = 0; i < array.length; i++) {
          if (array[i] === target) {
            index = i;
            // break if target element is found
            break;
          }
        }
    
        return index;
      }
    
      private linearSearchRecursion<T>(array: T[], target: T): number {
    
        const walk = (array: T[], n: number, i: number, target: T) => {
          if (i > n) {
            return -1;
          } else if (array[i] === target) {
            return i;
          } else {
            return walk(array, n, i + 1, target);
          }
        }
    
        return walk(array, array.length, 0, target);
      }
    
    
      private binarySearch<T>(array: T[], target: T): number {
    
        let start = 0, end = array.length - 1, median;
        while (start <= end) {
          median = Math.floor((start + end + 1) / 2);
          if (array[median] === target) {
            return median;
          } else if (array[median] > target) {
            end = median - 1;
          } else {
            start = median + 1;
          }
        }
        return -1;
      }
    
      private binarySearchRecursion<T>(array: T[], target: T): number {
    
        const walk = (array: T[], start: number, end: number, target: T) => {
          let median;
          if (start > end) {
            return -1;
          }
          median = Math.floor((start + end + 1) / 2);
          if (array[median] === target) {
            return median;
          } else if (array[median] > target) {
            return walk(array, start, median - 1, target);
          } else {
            return walk(array, median + 1, end, target);
          }
        }
    
        return walk(array, 0, array.length - 1, target);
      }
}