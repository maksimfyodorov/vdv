import { AttributeManager, AttributeInfo } from 'ues';
import { SitObject } from '../types/roo-types';

export interface Keuz {
  keuz_code: string;
  attr: string;
}

export const splitKeuz = (full_keuz: bigint | string): Keuz => {
  if (!full_keuz) {
    return;
  }

  if (typeof full_keuz === 'bigint' || typeof full_keuz === 'number') {
    full_keuz = String(full_keuz);
  }

  if (full_keuz) {
    const keuz = full_keuz.slice(0, 12);
    const attr = full_keuz.slice(12);

    return {
      keuz_code: keuz,
      attr,
    };
  }
};

export const loadSignAttribute = (keuz: Keuz, sitObj: SitObject) => {
  AttributeManager.load(keuz.keuz_code, (attributeManager) => {
    const attrInfo: AttributeInfo[] = attributeManager.getInfo();

    if (attrInfo?.length) {
      attrInfo.forEach((item, index) => {
        const attributeValue = keuz.attr.slice(index * 2, (index * 2) + 2);

        if (attributeValue) {
          attributeManager.setValue(item.code, attributeValue, sitObj);
        }
      });
    }
  });
};
