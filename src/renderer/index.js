// Only use require("babel-polyfill"); once in your whole app.
// Multiple imports or requires of babel-polyfill will throw an error
// since it can cause global collisions and other issues that are hard to trace.
// We recommend creating a single entry file
// that only contains the require statement
// https://github.com/babel/babel-preset-env
import 'babel-polyfill';


import XXNodeDomActor, {XXNodeDomActorOption} from
 'XXActionAlias/Actor/XXNodeDomActor.js';
import XXPosition from 'XXFoundation/Type/XXPosition.js';
import XXScale from 'XXFoundation/Type/XXScale.js';
import XXRotation from 'XXFoundation/Type/XXRotation.js';
// import xxvLog from 'XXTool/LogTool.js';

import Vue from 'vue';
import hello from './js/hello.vue';

import XXActionMoveTo from 'XXActionAlias/Action/BaseAction/XXActionMoveTo.js';
import XXActionRotateTo from
 'XXActionAlias/Action/BaseAction/XXActionRotateTo.js';
import XXActionScaleTo from
  'XXActionAlias/Action/BaseAction/XXActionScaleTo.js';

import XXActionSpeed from 'XXActionAlias/Action/BaseAction/XXActionSpeed.js';
import XXActionDelay from 'XXActionAlias/Action/BaseAction/XXActionDelay.js';
import XXActionSequence from 'XXActionAlias/Action/XXActionSequence.js';

require('./css/hello.css');

new Vue({
  el: '.mount-point-for-vue-js',
  template: '<hello></hello>',
  components: {
    hello: hello,
  },
});

setTimeout(() => {
  let option = new XXNodeDomActorOption(
    ['translate(20px, 14px)', 'scale(10.9, 20.3)', 'rotate(23deg)'],
    23,
    10.9,
    20.3);

  let nodeDomActor =
  new XXNodeDomActor('.animation-test-object1-js', undefined, option);
  let moveToAction = new XXActionMoveTo(new XXPosition(100, 500, 0), 5000);
  let scaleToAction = new XXActionScaleTo(new XXScale(1, 2), 5000);

  let rotationAction = new XXActionRotateTo(new XXRotation(90), 5000);
  scaleToAction;
  moveToAction;
  rotationAction;
  nodeDomActor;
  let speedAction = new XXActionSpeed(20, rotationAction);
  speedAction;
  let delayAction = new XXActionDelay(5000);
  delayAction;
  let actionSequence =
    new XXActionSequence(moveToAction,
                        delayAction,
                        scaleToAction,
                        rotationAction);
  let actionFinishedCallBack = function(event, action, actor) {
    console.log(
      'outter call back, uuid = ' + action.UUID + ' , event = ' + event);
  };
  actionFinishedCallBack;
  actionSequence;

  // rotationAction.then(actionFinishedCallBack);

  // console.log(actionSequence);
  nodeDomActor.runAction(actionSequence);
  // nodeDomActor.moveTo(new XXPosition(100, 500, 0));
}, 2000);


/**
 * promise object
 */
class XXPromiseInheritObject extends Promise {

  /**
   * [_testFunction description]
   */
  _testFunction() {

  }
  /**
   * [constructor description]
   * @param  {function} executor [description]
   */
  constructor(executor) {
    super((resolve, reject) => {
      // before
      return executor(resolve, reject);
    });

    /**
     * [first description]
     * @return {Promise}
     */
    this.first = () => {
      return super.then(() => {
        return new XXPromiseInheritObject((resolve, reject) => {
          setTimeout(() => {
            console.log('first 1000');
            resolve();
          }, 1000);
        });
      });
    };

    /**
     * [first description]
     * @return {Promise}
     */
    this.second = function() {
      return this.then(() => {
        return new XXPromiseInheritObject((resolve, reject) => {
          setTimeout(() => {
            console.log('second 2000');
            resolve();
          }, 2000);
        });
      });
    };

    /**
     * [first description]
     * @return {Promise}
     */
    this.third = function() {
      return this.then(() => {
        return new XXPromiseInheritObject((resolve, reject) => {
          setTimeout(() => {
            console.log('third 3000');
            resolve();
          }, 3000);
        });
      });
    };

    /**
     * [then description]
     * @param  {[type]} onFulfilled [description]
     * @param  {[type]} onRejected  [description]
     * @return {[type]}             [description]
     */
    this.then = (onFulfilled, onRejected) => {
      // before
      super.then(onFulfilled, onRejected);
      // after
      return new XXPromiseInheritObject((resolve, reject) => {
        resolve();
      });
    };
  }


}

let inheritedPromise = new XXPromiseInheritObject(
  (resolve, reject) => {
    resolve();
  });
console.log(inheritedPromise);
inheritedPromise.first().second().third();
