import { Layout, Text } from "@ui-kitten/components"
import LocaleSwitcher from "../components/LocaleSwitcher"
import { useTranslation } from "react-i18next"

type Props = {}

const Settings = (props: Props) => {
    const { t } = useTranslation()
    return (
        <Layout>
            <Text style={{ margin: 10 }} category="h1">{t('settings.title')}</Text>
            <LocaleSwitcher />
        </Layout>
    )
}

export default Settings