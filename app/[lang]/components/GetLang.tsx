import { getDictionary } from "@/get-dictionaries";
import { Locale } from "@/i18n-config";
import Counter from "@/app/[lang]/components/Counter";
import LocaleSwitcher from "@/app/[lang]/components/LocaleSwitcher";

export default async function GetLang({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <LocaleSwitcher />
      <p>Current locale: {lang}</p>
      <p>
        This text is rendered on the server:{" "}
        {dictionary["server-component"].welcome}
      </p>
      <Counter dictionary={dictionary.counter} />
    </div>
  );
}
