/**remove offset param when other params are set */
export const setAndFormatSearchParams = (
  params: URLSearchParams,
  key: string,
  value: string
) => {
  params.set(key, value);
  params.delete("offset");
};
