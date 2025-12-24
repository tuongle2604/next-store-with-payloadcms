import { FieldLabel } from "@payloadcms/ui";
import { type TextFieldServerComponent } from "payload";

import { VariantSelectClient } from "./VariantSelect.client";

export type VariantsArr = {
  label: string | null | undefined;
  value: string | null | undefined;
}[];

export const ProductVariantSelect: TextFieldServerComponent = async ({ path, readOnly }) => {
  return (
    <div className="mx-[5px] my-auto flex h-fit w-full flex-1 flex-col">
      <FieldLabel label="Variant" as="label" />
      <VariantSelectClient path={path} readOnly={true} />
    </div>
  );
};
