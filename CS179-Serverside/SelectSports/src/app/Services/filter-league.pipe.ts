import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLeague'
})
export class FilterLeaguePipe implements PipeTransform {
  transform(scores: any[], leagueName: string): any[] {
    if (!scores || !leagueName) {
      return [];
    }

    return scores.filter(score => score.strLeague === leagueName);
  }
}
