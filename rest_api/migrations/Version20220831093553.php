<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220831093553 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE board CHANGE author_id author_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE board ADD CONSTRAINT FK_58562B47F675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_58562B47F675F31B ON board (author_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE board DROP FOREIGN KEY FK_58562B47F675F31B');
        $this->addSql('DROP INDEX IDX_58562B47F675F31B ON board');
        $this->addSql('ALTER TABLE board CHANGE author_id author_id INT NOT NULL');
    }
}
