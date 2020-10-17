import * as assert from 'power-assert';
import {expect} from 'chai';
import * as collections from '../lib/index';

describe('Arrays', function () {
  it('IndexOf returns the right position', function () {
    let a = [1, 8, 10];
    expect(collections.arrays.indexOf(a, 1)).equals(0);
    expect(collections.arrays.indexOf(a, 8)).equals(1);
    expect(collections.arrays.indexOf(a, 10)).equals(2);
    expect(collections.arrays.indexOf(a, 11)).equals(-1);
    expect(collections.arrays.indexOf([], 8)).equals(-1);
  });

  it('IndexOf with custom equals function returns the right position', function () {
    let b = {
      val: 1,
    };
    let c = {
      val: 8,
    };
    let d = {
      val: 10,
    };
    let e = {
      val: 11,
    };
    let a = [b, c, d];

    let eq = function (arg1: any, arg2: any) {
      return arg1.val === arg2.val;
    };

    expect(
      collections.arrays.indexOf(a, {
        val: 1,
      })
    ).equals(-1);
    expect(
      collections.arrays.indexOf(
        a,
        {
          val: 1,
        },
        eq
      )
    ).equals(0);
    expect(collections.arrays.indexOf(a, c, eq)).equals(1);
    expect(
      collections.arrays.indexOf(
        a,
        {
          val: 10,
        },
        eq
      )
    ).equals(2);
    expect(collections.arrays.indexOf(a, e, eq)).equals(-1);
    expect(collections.arrays.indexOf([], b)).equals(-1);
  });

  it('lastIndexOf returns the right position', function () {
    let a = [1, 8, 8, 8, 10, 10];
    expect(collections.arrays.lastIndexOf(a, 1)).equals(0);
    expect(collections.arrays.lastIndexOf(a, 8)).equals(3);
    expect(collections.arrays.lastIndexOf(a, 10)).equals(5);
    expect(collections.arrays.lastIndexOf(a, 11)).equals(-1);
    expect(collections.arrays.lastIndexOf([], 8)).equals(-1);
  });

  it('lastIndexOf with custom equals function returns the right position', function () {
    let b = {
      val: 1,
    };
    let c = {
      val: 8,
    };
    let d = {
      val: 10,
    };
    let e = {
      val: 11,
    };
    let a = [b, b, c, d];

    let eq = function (arg1: any, arg2: any) {
      return arg1.val === arg2.val;
    };

    expect(
      collections.arrays.lastIndexOf(a, {
        val: 1,
      })
    ).equals(-1);
    expect(
      collections.arrays.lastIndexOf(
        a,
        {
          val: 1,
        },
        eq
      )
    ).equals(1);
  });

  it('Contains existing elements', function () {
    let a = [1, 8, 8, 8, 10, 10];
    expect(collections.arrays.contains(a, 1)).equals(true);
    expect(collections.arrays.contains(a, 8)).equals(true);
    expect(collections.arrays.contains(a, 10)).equals(true);
    expect(collections.arrays.contains(a, 11)).equals(false);
    expect(collections.arrays.contains([], 8)).equals(false);
  });

  it('Contains existing elements with custom equals function', function () {
    let b = {
      val: 1,
    };
    let c = {
      val: 8,
    };
    let d = {
      val: 10,
    };
    let e = {
      val: 11,
    };
    let a = [b, b, c, d];

    let eq = function (arg1: any, arg2: any) {
      return arg1.val === arg2.val;
    };

    expect(
      collections.arrays.contains(a, {
        val: 1,
      })
    ).equals(false);
    expect(
      collections.arrays.contains(
        a,
        {
          val: 1,
        },
        eq
      )
    ).equals(true);
    expect(
      collections.arrays.contains(
        a,
        {
          val: 8,
        },
        eq
      )
    ).equals(true);
    expect(
      collections.arrays.contains(
        a,
        {
          val: 10,
        },
        eq
      )
    ).equals(true);
    expect(
      collections.arrays.contains(
        a,
        {
          val: 11,
        },
        eq
      )
    ).equals(false);
    expect(
      collections.arrays.contains(
        [],
        {
          val: 11,
        },
        eq
      )
    ).equals(false);
  });

  it('Gives the right frequency', function () {
    let a = [1, 8, 8, 8, 10, 10];
    expect(collections.arrays.frequency(a, 1)).equals(1);
    expect(collections.arrays.frequency(a, 8)).equals(3);
    expect(collections.arrays.frequency(a, 10)).equals(2);
    expect(collections.arrays.frequency(a, 11)).equals(0);
  });

  it('Gives the right frequency with custom equals', function () {
    let b = {
      val: 1,
    };
    let c = {
      val: 8,
    };
    let d = {
      val: 10,
    };
    let e = {
      val: 11,
    };
    let a = [b, b, c, d];

    let eq = function (arg1: any, arg2: any) {
      return arg1.val === arg2.val;
    };
    expect(
      collections.arrays.frequency(a, {
        val: 1,
      })
    ).equals(0);
    expect(
      collections.arrays.frequency(
        a,
        {
          val: 1,
        },
        eq
      )
    ).equals(2);
    expect(
      collections.arrays.frequency(
        a,
        {
          val: 8,
        },
        eq
      )
    ).equals(1);
  });

  it('Equal arrays are equal', function () {
    let a = [1, 8, 8, 8, 10, 10];
    let b = [1, 8, 8, 8, 10, 10];
    let c = [1, 8, 5, 8, 10, 10];
    let d = [1, 8, 8, 8, 10];

    expect(collections.arrays.equals(a, a)).equals(true);
    expect(collections.arrays.equals(a, b)).equals(true);
    expect(collections.arrays.equals(a, [])).equals(false);
    expect(collections.arrays.equals(a, c)).equals(false);
    expect(collections.arrays.equals(a, d)).equals(false);
    expect(collections.arrays.equals(a, [])).equals(false);
  });

  it('Equal arrays are equal with custom equals function', function () {
    let a = [
      {
        val: 8,
      },
    ];
    let b = [
      {
        val: 8,
      },
    ];

    let eq = function (arg1: any, arg2: any) {
      return arg1.val === arg2.val;
    };

    expect(collections.arrays.equals(a, a)).equals(true);
    expect(collections.arrays.equals(a, a, eq)).equals(true);
    expect(collections.arrays.equals(a, b, eq)).equals(true);
    expect(collections.arrays.equals(a, b)).equals(false);
  });

  it('Removes elements', function () {
    let a: any = [];
    expect(collections.arrays.remove(a, 1)).equals(false);
    a = [4, 9, 9, 10];
    expect(collections.arrays.remove(a, 9)).equals(true);
    expect(collections.arrays.indexOf(a, 9)).equals(1);
    expect(collections.arrays.indexOf(a, 10)).equals(2);
    expect(collections.arrays.remove(a, 9)).equals(true);
    expect(collections.arrays.remove(a, 9)).equals(false);
    expect(collections.arrays.remove(a, 9)).equals(false);
  });

  it('Removes elements with custom equals function', function () {
    let c = {
      val: 8,
    };
    let d = {
      val: 10,
    };
    let eq = function (arg1: any, arg2: any) {
      return arg1.val === arg2.val;
    };

    let a = [c, d];
    expect(
      collections.arrays.remove(a, {
        val: 10,
      })
    ).equals(false);
    expect(
      collections.arrays.remove(
        a,
        {
          val: 10,
        },
        eq
      )
    ).equals(true);
  });

  it('For each gives the right ordering', function () {
    let a: any = [];
    collections.arrays.forEach(a, function (e) {
      expect(true).equals(false); // should not enter here
    });

    for (let i = 0; i < 10; i++) {
      a.push(i);
    }

    let j = 0;
    collections.arrays.forEach(a, function (e) {
      expect(e).equals(j);
      j++;
    });
  });

  it('For each can be interrupted', function () {
    let a: any = [];
    let b: any = [];
    for (let i = 0; i < 5; i++) {
      a.push(i);
    }
    collections.arrays.forEach(a, function (e) {
      b.push(e);
      if (e === 3) {
        return false;
      }
    });

    expect([0, 1, 2, 3]).to.deep.equal(b);
  });

  it('Copies existing arrays', function () {
    let a = [1, 8, 8, 8, 10, 10];
    let b = collections.arrays.copy(a);
    expect(collections.arrays.equals(a, b)).equals(true);
    expect(a === b).equals(false);
  });

  it('Swaps elements', function () {
    let a = [1, 8, 8, 8, 10, 10];
    expect(collections.arrays.swap(a, 0, 5)).equals(true);
    expect(a[0]).equals(10);
    expect(a[5]).equals(1);
    expect(collections.arrays.swap(a, 0, 6)).equals(false);
    expect(collections.arrays.swap(a, 7, 2)).equals(false);
    expect(collections.arrays.swap(a, -1, 9)).equals(false);
  });
});
