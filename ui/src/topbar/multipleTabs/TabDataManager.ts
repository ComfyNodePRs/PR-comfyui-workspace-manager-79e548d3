export const RE_RENDER_MULTIPLE_TABS_EVENT = "RE_RENDER_MULTIPLE_TABS_EVENT";
export const OPEN_TAB_EVENT = "OPEN_TAB_EVENT";
// @ts-ignore
import { app } from "/scripts/app.js";
export type TabData = {
  id: string;
  name: string;
  json: string;
  isDirty: boolean;
};
type TabUpdateInput = Partial<Omit<TabData, "id">>;

class TabDataManager {
  tabs: TabData[] = [];
  activeIndex: number = 0;
  activeTab: TabData | null = null;

  changeActiveTab(index: number, needLoadNewFlow: boolean = true) {
    this.saveCurTabJson();
    this.activeIndex = index;
    this.activeTab = this.tabs[index];
    this.notifyChanges(needLoadNewFlow ? "loadNewFlow" : "");
  }

  updateTabData(index: number, updateInput: TabUpdateInput) {
    if (this.tabs[index]) {
      this.tabs[index] = { ...this.tabs[index], ...updateInput };
      this.activeTab = this.tabs[index];
      this.notifyChanges(updateInput.json ? "loadNewFlow" : "");
    }
  }

  private saveCurTabJson() {
    const graphJson = JSON.stringify(app.graph.serialize());
    this.tabs[this.activeIndex].json = graphJson;
  }

  addTabData(newTab: TabData) {
    const currentFlowIsDirty = this.activeTab?.isDirty;
    const existingIndex = this.tabs.findIndex((tab) => tab.id === newTab.id);

    if (this.tabs.length === 0) {
      this.tabs.push(newTab);
      this.activeTab = newTab;
    } else {
      let nextActiveIndex = -1;

      if (existingIndex !== -1) {
        nextActiveIndex = existingIndex;
      } else if (currentFlowIsDirty) {
        nextActiveIndex = this.activeIndex + 1;
        this.tabs.splice(nextActiveIndex, 0, newTab);
      }

      if (nextActiveIndex >= 0) {
        this.saveCurTabJson();
        this.activeIndex = nextActiveIndex;
        this.activeTab = this.tabs[nextActiveIndex];
      } else {
        this.updateTabData(this.activeIndex, newTab);
        return;
      }
    }

    this.notifyChanges("loadNewFlow");
  }

  deleteTabData(index: number) {
    if (index < 0 || index >= this.tabs.length) return;

    if (this.tabs.length === 1) {
      this.tabs = [];
      this.activeIndex = 0;
      this.activeTab = null;
      this.notifyChanges("clearCanvas");
      return;
    }

    this.tabs.splice(index, 1);

    if (index === this.activeIndex) {
      this.activeIndex = Math.min(this.tabs.length - 1, this.activeIndex);
    } else if (index < this.activeIndex) {
      this.activeIndex--;
    }
    this.activeTab = this.tabs[this.activeIndex];

    this.notifyChanges("loadNewFlow");
  }

  private notifyChanges(otherAction?: string) {
    const event = new CustomEvent(RE_RENDER_MULTIPLE_TABS_EVENT, {
      detail: {
        tabs: this.tabs,
        activeIndex: this.activeIndex,
        activeTab: this.activeTab,
        otherAction,
      },
    });
    document.dispatchEvent(event);
  }
}

export const tabDataManager = new TabDataManager();
