import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'namePipe' })
export class NamePipe implements PipeTransform {
    transform(value: string): string {
        if (value.indexOf('/')>=0) {
            value = value.substr(value.indexOf('/')+1)
            return this.transform(value)
        }
        else {
            return value
        }
    }
}