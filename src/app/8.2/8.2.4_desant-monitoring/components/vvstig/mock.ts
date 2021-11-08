import { SecurityHierarchy, SecurityTech } from '../../../../shared/components/ospo/ospo-security/types/security.types';

export const VVSTIGTABLE: SecurityHierarchy = {
total: {
state: 7,
stock: 1,
excess: 1,
lack: 1,
broken: 1,
},
hierarchy: [
{
total: {
state: 1,
stock: 1,
excess: 1,
lack: 1,
broken: 1
},
children: [] as SecurityTech[],
}
]
}