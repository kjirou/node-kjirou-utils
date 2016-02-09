'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var within = exports.within = function within(num, minNum, maxNum) {
  return Math.min(Math.max(num, minNum), maxNum);
};

var toSignedNumber = exports.toSignedNumber = function toSignedNumber(num) {
  var zeroPrefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  var str = String(num);
  if (num === 0) {
    str = zeroPrefix + str;
  } else if (num > 0) {
    str = '+' + str;
  }
  return str;
};

var preventDefaultEvent = exports.preventDefaultEvent = function preventDefaultEvent(event) {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false; // For IE
  }
};

var preventEvents = exports.preventEvents = function preventEvents(event) {
  preventDefaultEvent(event);
  event.stopPropagation();
};

/*
 * Create class-based resources
 *
 * Mainly use this when you define the game data from JSON
 *
 * TODO: I want to set function.name
 *
 * @param {Function} BaseResource
 * @param {Array<object>} sourceDataList
 * @return {Array<Function>} - Sub class list
 */
var createClassBasedResourceList = exports.createClassBasedResourceList = function createClassBasedResourceList(BaseResource, sourceDataList) {
  return sourceDataList.map(function (_ref) {
    var _ref$constants = _ref.constants;
    var constants = _ref$constants === undefined ? {} : _ref$constants;
    var _ref$properties = _ref.properties;
    var properties = _ref$properties === undefined ? {} : _ref$properties;

    var Resource = function (_BaseResource) {
      _inherits(Resource, _BaseResource);

      function Resource() {
        var _Object$getPrototypeO;

        _classCallCheck(this, Resource);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Resource)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        Object.assign(_this, properties);
        return _this;
      }

      return Resource;
    }(BaseResource);

    ;
    Object.assign(Resource, constants);
    return Resource;
  });
};