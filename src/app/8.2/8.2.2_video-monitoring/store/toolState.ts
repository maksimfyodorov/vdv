import { Tool } from '../tools/Tool';

export class ToolState {
  tool: Tool;

  constructor(tool?: Tool) {
    this.tool = tool;
  }
}
