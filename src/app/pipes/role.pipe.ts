import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    switch (value) {
      case 'admin':
        return 'Adminstrator';
      case 'buildingOwner':
        return 'Building Owner';
      case 'businessOwner':
        return 'Business Owner';
      case 'personnel':
        return 'Personnel';
    }
    return null;
  }

}
