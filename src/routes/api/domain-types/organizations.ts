export type OrganizationDomainModel = {
  type?: string;
  name?: string;
  countryCode?:string;
  contactPhone?: string;
  contactEmail?: string;
  about?: string;
  operationalSince?: string;
  addressType?: string;
  addressLine?: string;
  city?: string;
  district?: string;
  state?: string;
  country?:string;
  postalCode?:string;
  imageResourceId?: string;
  isHealthFacility?: boolean;
}