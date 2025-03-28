'use client';
import Image from "next/image";
import { IProducts } from "@/app/products/products.interface";
// import { Product } from '@/types/cart';
import AddToCartButton from '@/components/AddToCartButton';

export default function ProductCard({ product }: { product: IProducts }) {
  return (
    <li className='card' key={product.id} >
                                <div className="card-image">
                                    <Image src={product.image} alt="" width='200' height='300' />
                                </div>
                  
                                <div className="card-info">
                                    <p className="category">{product.category}</p>
                                    <p>{product.title}</p>
                                    <p><b>{product.price} $</b></p>
                                </div>
                                
    
                                <div className="card-actions">
                                    <a href={`products/${product.id}`} className="card-link">
                                        Подробнее
                                    </a>
                                    <AddToCartButton product={product} />
                                </div>
                                
                                
                                
                            </li>
    
  );
}
