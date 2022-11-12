const { createRef } = require("../utils/createRef");

describe.only("createRef", () => {
  it("should return an empty object if passed an empty array", () => {
    expect(createRef([])).toEqual({});
  });

  it("should return an object with one key/value pair ", () => {
    const input = [
      {
        shop_id: 1,
        shop_name: "Dibbert Inc",
        owner: "Aaliyah",
        slogan: "Implemented motivating customer loyalty",
      },
    ];
    const output = {
      "Dibbert Inc": 1,
    };

    const result = createRef(input);

    expect(result).toEqual(output);
  });

  it("should return an object with multiple key/value pairs", () => {
    const input = [
      {
        shop_id: 1,
        shop_name: "Dibbert Inc",
        owner: "Aaliyah",
        slogan: "Implemented motivating customer loyalty",
      },
      {
        shop_id: 2,
        shop_name: "Annas Xmas Ghetto",
        owner: "Anna",
        slogan: "Implemented motivating customer loyalty",
      },
      {
        shop_id: 3,
        shop_name: "Feeney Inc",
        owner: "Elta",
        slogan: "Function-based intermediate secured line",
      },
      {
        shop_id: 4,
        shop_name: "Kshlerin, Koch and Monahan",
        owner: "Daphney",
        slogan: "Persevering web-enabled hardware",
      },
      {
        shop_id: 5,
        shop_name: "Botsford - Dickens",
        owner: "Maynard",
        slogan: "Multi-channelled high-level open system",
      },
    ];
    const output = {
      "Dibbert Inc": 1,
      "Annas Xmas Ghetto": 2,
      "Feeney Inc": 3,
      "Kshlerin, Koch and Monahan": 4,
      "Botsford - Dickens": 5,
    };

    const result = createRef(input);

    expect(result).toEqual(output);
  });
});
