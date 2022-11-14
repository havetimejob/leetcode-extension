/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/childProcessCall/my_plugin_base.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Thursday, October 27th 2022, 7:43:29 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */


let underscore = require('underscore');

import { config as out_config } from "./config";
import { storageUtils } from "./storageUtils";
// import { log } from "./log";
import { helper } from "./helper";

export class MyPluginBase {
  id;
  name;
  ver;
  desc;
  enabled;
  deleted;
  builtin;
  deps;
  next;
  plugins: Array<any> = [];
  installed: Array<MyPluginBase> = [];
  head; // 插件头 是core
  config;
  constructor() {
  }

  public save() {
    const stats = storageUtils.getCache(helper.KEYS.plugins) || {};

    if (this.deleted) delete stats[this.name];
    else stats[this.name] = this.enabled;

    storageUtils.setCache(helper.KEYS.plugins, stats);
  };

  public init() {
    this.config = out_config.plugins[this.name] || {};
    this.next = null;
  };

  public base_init(head?) {
    head = head || require('./core').corePlugin;
    const stats = storageUtils.getCache(helper.KEYS.plugins) || {};
    let file_plugin: Array<any> = storageUtils.listCodeDir('plugins');
    this.installed = [];
    for (let f of file_plugin) {
      const p = f.data;
      if (!p) continue;
      p.file = f.file;
      p.enabled = stats[p.name];
      if (!(p.name in stats)) {
        if (p.builtin) {
          p.enabled = true;
        } else {
          p.enabled = false;
        }
      }
      this.installed.push(p);
    }
    // 根据id大小排序, 大的前面
    this.installed = underscore.sortBy(this.installed, x => -x.id);
    // 从小的开始init
    for (let i = this.installed.length - 1; i >= 0; --i) {
      const p = this.installed[i];
      if (p.enabled) {
        p.init();
      }
    }
    // 连成链表状
    this.plugins = this.installed.filter(x => x.enabled);
    let last = head;
    for (let p of this.plugins) {
      last.setNext(p);
      last = p;
    }
    return true;
  };

  public setNext(next) {
    Object.setPrototypeOf(this, next);
    this.next = next;
  };
  public save_all() {
    for (let p of this.plugins) {
      p.save();
    }
  };

  public getProblems(Translate: boolean, cb) {
    this.next.getProblems(Translate, cb);
  }
  public getQuestionOfToday(cb) {
    this.next.getQuestionOfToday(cb);
  }

  public getRatingOnline(cb) {
    this.next.getRatingOnline(cb);
  }

  public getTestApi(username, cb) {
    this.next.getTestApi(username, cb);
  }
  public getUserContestP(username, cb) {
    this.next.getUserContestP(username, cb);
  }
  public getProblemsTitle(cb) {
    this.next.getProblemsTitle(cb);
  }
  public createSession(a, cb) {
    this.next.createSession(a, cb);
  }
  public getSessions(cb) {
    this.next.getSessions(cb);
  }
  public activateSession(s, cb) {
    this.next.activateSession(s, cb);

  }
  public deleteSession(s, cb) {
    this.next.deleteSession(s, cb);

  }
  public updateProblem(a, b) {
    this.next.updateProblem(a, b);

  }
  public getSubmissions(s, cb) {
    this.next.getSubmissions(s, cb);

  }
  public getSubmission(s, cb) {
    this.next.getSubmission(s, cb);

  }
  public submitProblem(s, cb) {
    this.next.submitProblem(s, cb);

  }
  public testProblem(s, cb) {
    this.next.testProblem(s, cb);

  }
  public login(user, cb) {
    this.next.login(user, cb);

  }
  public logout(user, cb) {
    this.next.logout(user, cb);

  }
  public githubLogin(user, cb) {
    this.next.githubLogin(user, cb);

  }
  public linkedinLogin(user, cb) {
    this.next.linkedinLogin(user, cb);

  }
  public cookieLogin(user, cb) {
    this.next.cookieLogin(user, cb);
  }
  public filterProblems(opts, cb) {
    this.next.filterProblems(opts, cb);
  }

  public getProblem(keyword, needTranslation, cb) {
    this.next.getProblem(keyword, needTranslation, cb);
  }

  public starProblem(problem, starred, cb) {
    this.next.starProblem(problem, starred, cb);
  }
  public exportProblem(problem, opts) {
    this.next.exportProblem(problem, opts);
  }

  public getTodayQuestion(cb) {
    this.next.getTodayQuestion(cb);
  }

  public getQueryZ(username, cb) {
    this.next.getQueryZ(username, cb);
  }

  public getUserContest(username, cb) {
    this.next.getUserContest(username, cb);
  }
}



export const myPluginBase: MyPluginBase = new MyPluginBase();