interface DayNumbers {
  start: number;
  end: number;
}

export class TableDesignChanger {

  private firstWeekIsOffset: boolean;
  private lastWeekIsOffset: boolean;
  private lastWeekIsNotFully: boolean;

  private startDayNumbers: DayNumbers;
  private middleDayNumbers: DayNumbers;
  private endDayNumbers: DayNumbers;

  private dayCont: number;
  private daysHTML: NodeListOf<HTMLElement>;

  constructor() {
  }

  public changeDesign(): void {
    this.prepareData();
    this.changeBorder();
  }

  public prepareData(): void {
    this.daysHTML = document.querySelectorAll('.day');
    this.dayCont = document.getElementsByClassName('day').length;
    this.startDayNumbers = this.calculateStartDayNumbers();
    this.middleDayNumbers = this.calculateMiddleDayNumbers(document.getElementsByClassName('week'));
    this.endDayNumbers = this.prepareEndDayNumbers();
  }

  calculateStartDayNumbers(): DayNumbers {
    if (document.getElementsByClassName('week-offset').item(0) != null) {
      this.firstWeekIsOffset = true;
      return {
        start: 0,
        // @ts-ignore
        end: document.getElementsByClassName('week-offset')[0]?.offsetWidth / 20 - 1,
      };
    } else {
      this.firstWeekIsOffset = false;
      return {
        start: 0,
        // @ts-ignore
        end: document.getElementsByClassName('week')[0]?.offsetWidth / 20 - 1,
      };
    }
  }

  calculateMiddleDayNumbers(weeksCount): DayNumbers {
    let endDay;
    let firstWeekDaysCount;
    if (!this.firstWeekIsOffset) {
      firstWeekDaysCount = weeksCount[0].offsetWidth / 20;
    } else {
      firstWeekDaysCount = null;
    }

    if ((weeksCount[weeksCount.length - 1].offsetWidth === 140 || 120) &&
      (((weeksCount.length - 1) * 7) + (firstWeekDaysCount ? firstWeekDaysCount : this.startDayNumbers.end)) - 1 === this.dayCont) {
      let lastWeekWidth = weeksCount[weeksCount.length - 1].offsetWidth;
      this.lastWeekIsOffset = false;

      endDay = ((weeksCount.length - 1) * 7)
        + (firstWeekDaysCount ? firstWeekDaysCount : this.startDayNumbers.end) - (lastWeekWidth === 140 ? 0 : 2);

    } else if ((((weeksCount.length - 1) * 7) + (firstWeekDaysCount ? firstWeekDaysCount : this.startDayNumbers.end)) - 1 === this.dayCont) {
      this.lastWeekIsNotFully = true;

      endDay = ((weeksCount.length - 1) * 7) + (firstWeekDaysCount ? firstWeekDaysCount : this.startDayNumbers.end)
        - (7 - (weeksCount[weeksCount.length - 1].offsetWidth / 20)) - 1;

    } else {
      this.lastWeekIsOffset = true;

      endDay = ((weeksCount.length - 1) * 7) + (firstWeekDaysCount ? firstWeekDaysCount : this.startDayNumbers.end)
        - (7 - (weeksCount[weeksCount.length - 1].offsetWidth / 20)) - 1;
    }

    return {
      start: this.startDayNumbers.end + 1,
      end: endDay,
    };
  }


  prepareEndDayNumbers(): DayNumbers {
    return {
      start: this.middleDayNumbers.end + 1,
      end: this.dayCont - 1,
    };
  }

  changeBorder(): void {
    this.changeStartDayBorder();
    this.changeMiddleDayBorder();
    this.changeEndDayBorder();
  }

  changeStartDayBorder(): void {
    if (this.firstWeekIsOffset) {
      if (this.startDayNumbers.start !== this.startDayNumbers.end) {
        this.daysHTML[this.startDayNumbers.start].style['border-right'] = 'white';
      }
      // @ts-ignore
      this.daysHTML[this.startDayNumbers.start].style['border-left'] = 'white';

      for (let i = this.startDayNumbers.start; i < this.startDayNumbers.end; i++) {
        // @ts-ignore
        this.daysHTML[i].style['border-right'] = 'white';
        // @ts-ignore
        this.daysHTML[i].style['border-left'] = 'white';
      }
      // @ts-ignore
      this.daysHTML[this.startDayNumbers.end].style['border-left'] = 'white';
    } else {
      if (this.startDayNumbers.start !== this.startDayNumbers.end) {
        // @ts-ignore
        this.daysHTML[this.startDayNumbers.start].style['border-right'] = 'white';
      }
      for (let i = this.startDayNumbers.start + 1; i < this.startDayNumbers.end; i++) {
        // @ts-ignore
        this.daysHTML[i].style['border-right'] = 'white';
        // @ts-ignore
        this.daysHTML[i].style['border-left'] = 'white';
      }
      // @ts-ignore
      this.daysHTML[this.startDayNumbers.end].style['border-left'] = 'white';
    }
  }

  changeMiddleDayBorder(): void {
    let lastMonday = this.middleDayNumbers.start;
    let lastSunday = lastMonday + 6;
    for (let i = this.middleDayNumbers.start; i < this.middleDayNumbers.end; i++) {
      if (i === lastMonday) {
        lastMonday += 7;
        // @ts-ignore
        this.daysHTML[i].style['border-right'] = 'white';

      } else if (i === lastSunday) {
        lastSunday += 7;
        // @ts-ignore
        this.daysHTML[i].style['border-left'] = 'white';
      } else {
        // @ts-ignore
        this.daysHTML[i].style['border-right'] = 'white';
        // @ts-ignore
        this.daysHTML[i].style['border-left'] = 'white';
      }
    }
  }

  changeEndDayBorder(): void {
    if (this.middleDayNumbers.end + 1 !== this.dayCont) {
      // @ts-ignore
      this.daysHTML[this.endDayNumbers.start].style['border-left'] = 'white';
      for (let i = this.endDayNumbers.start; i < this.endDayNumbers.end - 1; i++) {
        // @ts-ignore
        this.daysHTML[i].style['border-right'] = 'white';
        // @ts-ignore
        this.daysHTML[i].style['border-left'] = 'white';
      }
      // @ts-ignore
      this.daysHTML[this.endDayNumbers.end].style['border-left'] = 'white';
      if (!this.lastWeekIsOffset) {
        // @ts-ignore
        this.daysHTML[this.endDayNumbers.start].style['border-right'] = 'white';
      }
    }
  }

}

