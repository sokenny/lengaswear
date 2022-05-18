import { NextPageAugmented, ProductType } from 'types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { capitalize } from '@/utils/index'
import { ParsedUrlQuery } from 'querystring'
import Recommended, {TRecommended} from '@/components/modules/Recommended/Recommended'
import Nav from '@/components/modules/Nav/Nav'
import FixedProductCta from '@/components/modules/FixedProductCta/FixedProductCta'
import AssetAndText from '@/components/modules/AssetAndText/AssetAndText';
import TopProductSection from '@/components/modules/TopProductSection/TopProductSection'
import Image from 'next/image';
import Head from 'next/head';
import styles from '../../styles/Billetera.module.scss'

const recommendedProducts:TRecommended[] = [
    {name: 'chocolate', image: '/billeteras/chocolate/recommended.webp', href: '/billeteras/chocolate', price: '$3.950'},
    {name: 'suela', image: '/billeteras/suela/recommended.webp', href: '/billeteras/suela', price: '$3.950'},
    {name: 'boom', image: '/billeteras/boom/recommended.webp', href: '/billeteras/boom', price: '$3.950'},
]

const Billetera:NextPageAugmented<{billetera: string}> = ({billetera}) => {
    
    const imgs = [1,2,3,4].map((item)=> `/billeteras/${billetera}/billetera-cuero-genuino-${item}.webp`)
    const product:ProductType = {
        name: billetera,
        price: 3950,
        description: 'Texto corto de descripción del modelo, cual es el diferencial.'
    }

    return (
        <>
        <Head>
            <title>{capitalize(billetera)} | Billeteraes | Lengas</title>
        </Head>
        <div className={styles.Billetera}>
            <FixedProductCta product={product} />
            <TopProductSection imgs={imgs} product={product} />
            <div className='container'>
                <AssetAndText 
                title="Una nueva forma de llevarlo todo" 
                description="Ser feliz es simple, ser simple no tanto. Proponemos una billetera que viene a instaurar un andar más sencillo." 
                asset={`/billeteras/${billetera}/billetera-en-uso.webp`} 
                assetLeft={false} />

                <AssetAndText 
                title="La simpleza de Lengas en una billetera" 
                description="Creemos en un consumo responsable, esto nos lleva a crear con propósito. Este taquito de madera lenga no solo es el responsable de hacer llegar tu billetera en perfectas condiciones. Sino que viene a dar un toque único, estética y funcionalmente, dentro de tu hogar." 
                asset={`/billeteras/${billetera}/billetera-en-uso.webp`} 
                />
                <AssetAndText 
                title="Creado con propósito" 
                description="Creemos en un consumo responsable, esto nos lleva a crear con propósito. Este taquito de madera lenga no solo es el responsable de hacer llegar tu billetera en perfectas condiciones. Sino que viene a dar un toque único, estética y funcionalmente, dentro de tu hogar." 
                asset={`/billeteras/${billetera}/billetera-en-uso.webp`} 
                assetLeft={false} 
                />
            </div>
            <WalletSpecs />
            <div className="container">
                <Recommended products={recommendedProducts} />
                
            </div>
        </div>
        </>
    )
}
    
interface IParams extends ParsedUrlQuery {
    billetera: string
}

const WalletSpecs:React.FC = () => {
    return (
        <section className={styles.WalletSpecs}>
            <div>
                <Image src="/billeteras/specs.webp" width={1200} height={571} />
            </div>
        </section>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
          { params: { billetera: 'chocolate' } },
          { params: { billetera: 'suela' } },
          { params: { billetera: 'boom' } },
        ],
        fallback: true
      };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { billetera } = context.params as IParams 
    // const props = fetch(`/api/${billetera}`)
    const props = {billetera}
    return { props }
}

Billetera.nav = <Nav theme="scrolled" />

export default Billetera;