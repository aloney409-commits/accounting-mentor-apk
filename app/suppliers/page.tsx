'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BackButton } from '@/components/ui/BackButton';
import { motion } from 'framer-motion';

export default function SuppliersPage() {
  const [search, setSearch] = useState('');
  const [suppliers, setSuppliers] = useState([
    { id: '101', name: 'شركة التوريدات العالمية', group: 'موردين محليين', balance: 5000 },
    { id: '102', name: 'مؤسسة الأمل التجارية', group: 'موردين محليين', balance: -1200 },
    { id: '201', name: 'Global Tech Co.', group: 'موردين خارجيين', balance: 15000 },
  ]);

  const filteredSuppliers = suppliers.filter(s => 
    s.name.includes(search) || s.id.includes(search)
  );

  return (
    <main className="min-h-screen p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-2xl font-bold">إدارة الموردين</h1>
          </div>
          <div className="flex gap-2">
            <Button className="bg-primary text-white">إضافة (F6)</Button>
          </div>
        </header>

        <Card className="p-4">
          <div className="relative">
            <Input 
              placeholder="بحث برقم المورد أو الاسم..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
          </div>
        </Card>

        <div className="grid gap-4">
          {filteredSuppliers.map((supplier, idx) => (
            <motion.div
              key={supplier.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="p-4 flex justify-between items-center hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-bold text-lg">{supplier.name}</h3>
                  <p className="text-sm text-muted-foreground">رقم الحساب: {supplier.id} | {supplier.group}</p>
                </div>
                <div className="text-left">
                  <p className={`font-mono font-bold ${supplier.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.abs(supplier.balance).toLocaleString()} {supplier.balance >= 0 ? 'دائن' : 'مدين'}
                  </p>
                  <Button variant="ui" size="sm" className="mt-2">عرض الكشف</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur shadow-lg border rounded-full px-6 py-3 flex gap-4 text-xs font-bold text-muted-foreground">
          <span>F6: إضافة</span>
          <span>F10: حفظ</span>
          <span>F5: عرض</span>
          <span>F9: بحث</span>
        </div>
      </div>
    </main>
  );
}
