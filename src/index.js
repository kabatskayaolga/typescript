var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* eslint-disable @typescript-eslint/no-unused-vars */
var Figure = /** @class */ (function () {
    function Figure(name, color) {
        this.name = name;
        this.color = color;
    }
    return Figure;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(name, color, radius) {
        var _this = _super.call(this, name, color) || this;
        _this.radius = radius;
        return _this;
    }
    Circle.prototype.calculateArea = function () {
        return Math.PI * Math.pow(this.radius, 2);
    };
    return Circle;
}(Figure));
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(name, color, length, width) {
        var _this = _super.call(this, name, color) || this;
        _this.length = length;
        _this.width = width;
        return _this;
    }
    Rectangle.prototype.print = function () {
        return 'Area = length * width';
    };
    Rectangle.prototype.calculateArea = function () {
        return this.length * this.width;
    };
    return Rectangle;
}(Figure));
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(name, color, width) {
        var _this = _super.call(this, name, color) || this;
        _this.width = width;
        return _this;
    }
    Square.prototype.print = function () {
        return 'Area = width * width';
    };
    Square.prototype.calculateArea = function () {
        return Math.pow(this.width, 2);
    };
    return Square;
}(Figure));
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle(name, color, side1, side2, side3) {
        var _this = _super.call(this, name, color) || this;
        _this.side1 = side1;
        _this.side2 = side2;
        _this.side3 = side3;
        return _this;
    }
    Triangle.prototype.calculateArea = function () {
        var semiPerimeter = (this.side1 + this.side2 + this.side3) / 2;
        return Math.sqrt(semiPerimeter * (semiPerimeter - this.side1) * (semiPerimeter - this.side2) * (semiPerimeter - this.side3));
    };
    return Triangle;
}(Figure));
