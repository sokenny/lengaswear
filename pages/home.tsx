import { useState, useEffect } from "react";
import { NextPage } from "next"
import Head from "next/head"
import { returns, shipping, safePurchase, safe, star, arrow } from "@/utils/icons";
import styles from '../styles/Home.module.scss';
import { ReactNode } from "react";

type TestimonialsType = {stars: number, quote: string, name: string, location: string}[]

const testimonials:TestimonialsType = [
    {stars: 4, quote: `"El reloj es divino. Me parece super fino y delicado. Y, lo que más me hace apreciarlo es la sencillez."`, name: "Martina Andrade", location: "Buenos Aires, Argentina"},
    {stars: 5, quote: `"El reloj es divino. Me parece super fino y delicado. Y, lo que más me hace apreciarlo es la sencillez."`, name: "Martina Andrade", location: "Buenos Aires, Argentina"},
    {stars: 3, quote: `"El reloj es divino. Me parece super fino y delicado. Y, lo que más me hace apreciarlo es la sencillez."`, name: "Martina Andrade", location: "Buenos Aires, Argentina"},
]

const Home: NextPage = () => {
    return (
        <div className={styles.Home}>
            <HeroBanner title="artesanales" subtitle="Piezas de tiempo" cta="Ver productos" image="/home-banner.webp" />
            <div className={styles.Home__container}>
                <FeaturedCategories />
                <StoreInfo />
                <AssetAndText title="Sustentable y artesanal" description="Aca escribir un texto, tipo intro a algun tema mas desarrollado en la parte de nosotros/historia, sobre el proceso de producción contando valores de lengas. Talvez de la historia de lengas o los relojes." image="/asset-placeholder.webp" ctaSection={<ArrowCta cta={"Leer mas"} color="gray" />} />
            </div>
            <HeroStripe title="Plantas un árbol" description="Con tu compra, en conjunto con la fundacion ReforestArg estamos ayudando a restaurar areas degradadas de Patagonia." cta="Leer más" image="/bosque-de-lengas.webp" />
            <div className={styles.Home__container}>
                <Gallery />
            </div>
            <Testimonials testimonials={testimonials} />
            <div className={styles.Home__container}>
                <Newsletter />
            </div>
        </div>
    )
}

type HeroBannerProps = {
    title: string,
    subtitle: string,   
    image: string,
    cta: string,
}

const HeroBanner:React.FC<HeroBannerProps> = ({title, subtitle, cta, image}) => {
    return (
        <section className={styles.HeroBanner} style={{backgroundImage: `url('${image}')`}}>
            <h2 className={styles.HeroBanner__subtitle}>{subtitle}</h2>
            <h1 className={styles.HeroBanner__title}>{title}</h1>
            <ArrowCta cta={cta} />
        </section>
    )
}

const FeaturedCategories:React.FC = () => {
    return (
        <section className={styles.FeaturedCategories}>
            <div className={styles.FeaturedCategories__watches} style={{backgroundImage: `url('/categoria-relojes.webp')`}}>
                <div>
                    <h3>Inspirados en la Patagonia</h3>
                    <ArrowCta cta="VER RELOJES" />
                </div>
            </div>
            <div className={styles.FeaturedCategories__wallets} style={{backgroundImage: `url('/categoria-billeteras.webp')`}}>
                <div>
                    <h3>Inspirados en la Patagonia</h3>
                    <ArrowCta cta="VER BILLETERAS" />
                </div>
            </div>
            
        </section>
    )
}

type ArrowCtaProps = {
    cta: string,
    color?: string,
}

const ArrowCta:React.FC<ArrowCtaProps> = ({cta, color="white"}) => {
    return (
        <div className={styles.ArrowCta}>
            <div>{cta}</div>
            <div>{arrow(25, color)}</div>
        </div>
    )
}

const StoreInfo:React.FC = () => {

    const items:{icon:ReactNode, title: string, text:string}[] = [
        {icon: returns(25, "gold"), title: 'Devolución gratuita', text: 'hasta 7 dias despues de tu compra.'},
        {icon: shipping(25, "gold"), title: 'Envío gratis', text: 'a todo el país.'},
        {icon: safePurchase(25, "gold"), title: 'Compra segura', text: 'mediante Mercadopago, Paypal o GooglePay.'},
        {icon: safe(25, "gold"), title: 'Garantía', text: 'por 12 meses en caso de cualquier falla.'},
    ]

    return (
        <section className={styles.StoreInfo}>
            <div className={styles.StoreInfo__info}>
                {items.map((item)=>
                    <div className={styles.StoreInfo__item} key={item.title}>
                        <div className={styles.StoreInfo__icon}>{item.icon}</div>
                        <div>
                            <div>{item.title}</div>
                            <div>{item.text}</div>
                        </div>
                    </div>
                )
                }
            </div>
            <div className={styles.StoreInfo__image}></div>            
        </section>
    )
}

type AssetAndTextProps = {
    title: string,
    description: string,
    image: string,
    ctaSection?:ReactNode,
    assetLeft?: boolean,
}

const AssetAndText:React.FC<AssetAndTextProps> = ({title, description, image, ctaSection=false, assetLeft=true}) => {
    return (
        <section className={`${styles.AssetAndText} ${styles[`AssetAndText-asset${assetLeft ? 'Left' : 'Rigth'}`]}`}>
            <div className={styles.AssetAndText__asset}>
                <img src={image}/>
            </div>
            <div className={styles.AssetAndText__text}>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className={styles.AssetAndText__ctaSection}>
                    {ctaSection}
                </div>
            </div>
        </section>
    )
}

type HeroStripeProps= {
    title: string,
    description: string,
    cta: string,
    image: string,
}

const HeroStripe:React.FC<HeroStripeProps> = ({title, description, cta, image}) => {
    return (
        <section className={styles.HeroStripe} style={{backgroundImage: `url('${image}')`}}>
            <div>
                <h3 className={styles.HeroStripe__title}>{title}</h3>
                <p className={styles.HeroStripe__description}>{description}</p>
                <ArrowCta cta={cta} />
            </div>
        </section>
    )
}

const Gallery:React.FC = () => {
    return (
        <section className={styles.Gallery}>
            <div>
                <div>
                    <h3>Uno con la naturaleza</h3>
                </div>
                <div className={styles.Gallery__image}>
                    <img src="/gallery/relojes-de-madera-artesanales-1.webp" alt="" />
                </div>
                <div className={styles.Gallery__image}>
                    <img src="/gallery/relojes-de-madera-artesanales-2.webp" alt="" />
                </div>
            </div>
            <div>
                <div className={styles.Gallery__image}>
                    <img src="/gallery/relojes-de-madera-artesanales-3.webp" alt="" />
                </div>
                <div className={styles.Gallery__image}>
                    <img src="/gallery/relojes-de-madera-artesanales-4.webp" alt="" />
                </div>
            </div>
        </section>
    )
}

type TestimonialsProps = {
    testimonials: TestimonialsType,
}

const Testimonials:React.FC<TestimonialsProps> = ({testimonials}) => {
    return (
        <section className={styles.Testimonials}>
            <div>
                <h3>¿Qué opinan los que usan Lengas?</h3>
                <div className={styles.Testimonials__section}>
                    <div className={styles.Testimonials__set}>
                        {testimonials.map((testimonial, index)=>
                            <div className={styles.Testimonials__testimonial}>
                                <div className={styles.Testimonials__stars}>{
                                    [...Array(5)].map((_, i)=>
                                        <div>{star(20, testimonial.stars>=i+1 ? "gold" : "lightgray")}</div>
                                    )}
                                </div>
                                <div className={styles.Testimonials__quote}>{testimonial.quote}</div>
                                <div className={styles.Testimonials__name}>{testimonial.name}</div>
                                <div className={styles.Testimonials__location}>{testimonial.location}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

const EmailInput:React.FC<{email:string, onChange:(val:string)=>void}> = ({email, onChange}) => {
    return (
        <div className={styles.EmailInput}>
            <input type="email" value={email} placeholder="Tu Email" onChange={(e)=>onChange(e.target.value)} />
            <div>{arrow(25, "gray")}</div>
        </div>
    )
}   

const Newsletter:React.FC = () => {

    const [email, setEmail] = useState<string>("")

    return (
        <section className={styles.Newsletter}>
            <AssetAndText assetLeft={false} title="Suscribite a nuestro Newsletter!" description="Mantenete informado acerca de nuevos lanzamientos y novedades sobre el impacto que nuestro proyecto está generando. (agregaria algo sobre dtos para incentivar)" image="/reloj-patagonia-madera-argentina.webp" ctaSection={<EmailInput email={email} onChange={setEmail} />} />
        </section>
    )
}

export default Home;