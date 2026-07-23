import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('menus')
export class Menu {
    @PrimaryGeneratedColumn('uuid') // Menggunakan UUID agar id berupa string seperti di interface
    id!: string;

    @Column({ type: 'varchar', nullable: true })
    parentId!: string | null;

    @Column()
    name!: string;

    @Column({ type: "varchar", nullable: true })
    path!: string | null;

    @Column({ type: "varchar", nullable: true })
    icon!: string | null;

    @Column({ type: 'int', default: 0 })
    order!: number;

    @Column({ default: true })
    isActive!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    // Relasi Self-Referencing (Opsional untuk query, tapi sangat membantu)
    @ManyToOne(() => Menu, (menu) => menu.children, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'parentId' })
    parent!: Menu;

    @OneToMany(() => Menu, (menu) => menu.parent)
    children!: Menu[];
}