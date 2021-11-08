import { Fixation } from '../../../models/equipment.model';
import { BackendFixation } from '../video-monitoring';

export const mapFixationFromBackend = (fixation: BackendFixation): Fixation => ({
  uuid: fixation.uuid,
  number: fixation.number,
  year: fixation.year,
  specifications: fixation.specifications.map((spec) => ({ name: spec.specification.name, value: spec.value })),
});
