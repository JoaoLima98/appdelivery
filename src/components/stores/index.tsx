import { FlatList} from 'react-native';
import{ useLayoutEffect, useState } from 'react'
import { StoreItem } from './horizontal'
import { useStores } from '@/hooks/useStores'


export interface StoresProperties{
    id: string;
    name: string;
    image:string
}


export function Stores() {
  const { stores } = useStores()
        
  return (
      <FlatList
        data={stores}
        renderItem={({ item }) => <StoreItem item={item}/>}
        horizontal= {true}
        contentContainerStyle={{gap: 14, paddingLeft:16, paddingRight:16}}
        showsHorizontalScrollIndicator={false}
      />
    );
}