import styles from "./Product.module.css";
import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import cn from "classnames";
import { IProduct } from "../../interfaces/product.interface";
import { Htags, Card, Rating, Tag, P, Button } from "../index";
import PremIcon from "./prem.svg";
import { declOfNum } from "../../helpers/helpers";

interface ProductProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  product: IProduct;
}

export const Product = ({ product, className }: ProductProps): JSX.Element => {
  return (
    <Card className={styles.product} key={product._id}>
      <div className={styles.logo}>
        <img
          src={`https://courses-top.ru${product.image}`}
          alt={product.title}
        />
      </div>
      <div className={styles.title}>
        <Htags tag="h3">{product.title}</Htags>
      </div>
      <div className={styles.price}>
        <div>{product.price}</div>
      </div>
      <div className={styles.credit}>
        <div>{product.credit}</div>
      </div>
      <div className={styles.rating}>
        <Rating rating={product.reviewAvg ?? product.initialRating} />
      </div>
      <div className={styles.tags}>
        {product.categories.map((c) => (
          <Tag color="ghost" key={c}>
            {c}
          </Tag>
        ))}
      </div>
      <div className={styles.priceTitle}>цена</div>
      <div className={styles.creditTitle}>в кредит</div>
      <div className={styles.ratingTitle}>
        {product.reviewCount}{" "}
        {declOfNum(product.reviewCount, ["отзыв", "отзыва", "отзывов"])}
      </div>

      <hr color="#EBEBEB" />

      <P size="m" className={styles.description}>
        {product.description}
      </P>
      <div className={styles.feature}>
        {product.characteristics.map((c) => (
          <div className={styles.characteristics} key={c.name}>
            <span className={styles.characteristicsName}>{c.name}</span>
            <span className={styles.characteristicsDots}>{}</span>
            <span className={styles.characteristicsValue}>{c.value}</span>
          </div>
        ))}
      </div>
      <div className={styles.advBlock}>
        {product.advantages && (
          <div className={styles.advantages}>
            <div className={styles.advantagesTitle}>Преимущества</div>
            <div className={styles.advantagesText}> {product.advantages}</div>
          </div>
        )}
        {product.disadvantages && (
          <div className={styles.disadvantages}>
            <div className={styles.advantagesTitle}>Недостатки</div>
            <div className={styles.advantagesText}>{product.disadvantages}</div>
          </div>
        )}
      </div>
      <hr color="#EBEBEB" />

      <div className={styles.actions}>
        <Button apperance="primary">Узнать&nbsp;подробнее</Button>
        <Button apperance="ghost" arrow="right">
          Читать&nbsp;отзывы
        </Button>
      </div>
    </Card>
  );
};