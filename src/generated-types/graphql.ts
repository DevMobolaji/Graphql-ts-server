import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddCategoryInput = {
  name: Scalars['String'];
};

export type AddProductInput = {
  categoryId: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  onSale?: InputMaybe<Scalars['Boolean']>;
  price: Scalars['Float'];
  quantity: Scalars['Int'];
};

export type AddReviewInput = {
  comment: Scalars['String'];
  productId: Scalars['ID'];
  rating: Scalars['Int'];
  title: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  products: Array<Product>;
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  AddCategory: Category;
  AddProduct?: Maybe<Array<Error>>;
  AddReview?: Maybe<Array<Error>>;
  confirmEmail: Scalars['Boolean'];
  deleteCategory: Scalars['Boolean'];
  deleteProduct: Scalars['Boolean'];
  deleteReview: Scalars['Boolean'];
  forgotPasswordChange?: Maybe<Array<Error>>;
  login?: Maybe<Array<Error>>;
  logout?: Maybe<Scalars['Boolean']>;
  register?: Maybe<Array<Error>>;
  sendForgotPasswordEmail?: Maybe<Scalars['Boolean']>;
  updateCategory?: Maybe<Category>;
  updateProduct: Product;
  updateReview?: Maybe<Review>;
};


export type MutationAddCategoryArgs = {
  input: AddCategoryInput;
};


export type MutationAddProductArgs = {
  input: AddProductInput;
};


export type MutationAddReviewArgs = {
  input?: InputMaybe<AddReviewInput>;
};


export type MutationConfirmEmailArgs = {
  id: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['ID'];
};


export type MutationForgotPasswordChangeArgs = {
  key: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSendForgotPasswordEmailArgs = {
  email: Scalars['String'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID'];
  input: UpdateCategoryInput;
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID'];
  input: UpdateProductInput;
};


export type MutationUpdateReviewArgs = {
  id: Scalars['ID'];
  input: UpdateReviewInput;
};

export type Product = {
  __typename?: 'Product';
  category?: Maybe<Category>;
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  name: Scalars['String'];
  onSale: Scalars['Boolean'];
  price: Scalars['Float'];
  quantity: Scalars['Int'];
  reviews?: Maybe<Array<Review>>;
  user?: Maybe<User>;
};

export type ProductsFilterInput = {
  onSale?: InputMaybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category: Category;
  hello?: Maybe<Scalars['String']>;
  me?: Maybe<User>;
  product: Product;
  products: Array<Product>;
  productsByFilter: Array<Product>;
  review: Review;
  reviews: Array<Review>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryHelloArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QueryProductsByFilterArgs = {
  filter?: InputMaybe<ProductsFilterInput>;
};


export type QueryReviewArgs = {
  id: Scalars['ID'];
};

export type Review = {
  __typename?: 'Review';
  comment: Scalars['String'];
  id: Scalars['ID'];
  product: Product;
  rating: Scalars['Int'];
  title: Scalars['String'];
  user: User;
};

export type UpdateCategoryInput = {
  name: Scalars['String'];
};

export type UpdateProductInput = {
  categoryId?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  onSale: Scalars['Boolean'];
  price: Scalars['Float'];
  quantity: Scalars['Int'];
};

export type UpdateReviewInput = {
  comment: Scalars['String'];
  productId: Scalars['ID'];
  rating: Scalars['Int'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddCategoryInput: AddCategoryInput;
  AddProductInput: AddProductInput;
  AddReviewInput: AddReviewInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  Error: ResolverTypeWrapper<Error>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Product: ResolverTypeWrapper<Product>;
  ProductsFilterInput: ProductsFilterInput;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateProductInput: UpdateProductInput;
  UpdateReviewInput: UpdateReviewInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddCategoryInput: AddCategoryInput;
  AddProductInput: AddProductInput;
  AddReviewInput: AddReviewInput;
  Boolean: Scalars['Boolean'];
  Category: Category;
  Error: Error;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Product: Product;
  ProductsFilterInput: ProductsFilterInput;
  Query: {};
  Review: Review;
  String: Scalars['String'];
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateProductInput: UpdateProductInput;
  UpdateReviewInput: UpdateReviewInput;
  User: User;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  AddCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationAddCategoryArgs, 'input'>>;
  AddProduct?: Resolver<Maybe<Array<ResolversTypes['Error']>>, ParentType, ContextType, RequireFields<MutationAddProductArgs, 'input'>>;
  AddReview?: Resolver<Maybe<Array<ResolversTypes['Error']>>, ParentType, ContextType, Partial<MutationAddReviewArgs>>;
  confirmEmail?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationConfirmEmailArgs, 'id'>>;
  deleteCategory?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCategoryArgs, 'id'>>;
  deleteProduct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'id'>>;
  deleteReview?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteReviewArgs, 'id'>>;
  forgotPasswordChange?: Resolver<Maybe<Array<ResolversTypes['Error']>>, ParentType, ContextType, RequireFields<MutationForgotPasswordChangeArgs, 'key' | 'newPassword'>>;
  login?: Resolver<Maybe<Array<ResolversTypes['Error']>>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  logout?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  register?: Resolver<Maybe<Array<ResolversTypes['Error']>>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'password'>>;
  sendForgotPasswordEmail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSendForgotPasswordEmailArgs, 'email'>>;
  updateCategory?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<MutationUpdateCategoryArgs, 'id' | 'input'>>;
  updateProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'id' | 'input'>>;
  updateReview?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<MutationUpdateReviewArgs, 'id' | 'input'>>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  onSale?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<QueryCategoryArgs, 'id'>>;
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<QueryHelloArgs>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  productsByFilter?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, Partial<QueryProductsByFilterArgs>>;
  review?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<QueryReviewArgs, 'id'>>;
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>;
};

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Category?: CategoryResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

