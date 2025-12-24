import { Checkout } from "@/components/checkout";
import { getCustomerFromToken } from "@/lib/payload/customer";

export default async function Page() {
  const { payload: customerProfile = {} } = await getCustomerFromToken();

  return <Checkout customerProfile={customerProfile} />;
}
