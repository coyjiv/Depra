import { Layout, Text } from "@ui-kitten/components"
import LocaleSwitcher from "../components/LocaleSwitcher"

type Props = {}

const Settings = (props: Props) => {
    return (
        <Layout>
            <Text category="h1">Settings</Text>
            <LocaleSwitcher />
        </Layout>
    )
}

export default Settings