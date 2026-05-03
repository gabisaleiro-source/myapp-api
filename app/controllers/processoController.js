const Processo = require('../models/Processo');
const processoPolicy = require('../policies/processoPolicy');
const processoResource = require('../resources/ProcessoResource');

const populateProcesso = [
    { path: 'user' },
    {
        path: 'rua',
        populate: { path: 'freguesia' }
    },
    { path: 'tipoPublicidade' }
];

exports.index = async (req, res) => {
    try {
        if (!processoPolicy.viewAny(req.user)) {
            return res.status(403).json({ error: 'Não autorizado' });
        }

        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = 10;
        const skip = (page - 1) * limit;

        const total = await Processo.countDocuments();

        const processos = await Processo.find()
            .populate(populateProcesso)
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 });

        return res.status(200).json({
            data: processos.map(processoResource),
            meta: {
                total,
                per_page: limit,
                current_page: page,
                last_page: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('Erro no Index de Processos:', error);
        return res.status(500).json({ error: 'Erro ao listar processos' });
    }
};

exports.store = async (req, res) => {
    try {
        if (!processoPolicy.create(req.user)) {
            return res.status(403).json({ error: 'Não autorizado' });
        }

        const processo = await Processo.create({
            ...req.body,
            user: req.user.id
        });

        const processoComRelacoes = await Processo.findById(processo._id)
            .populate(populateProcesso);

        return res.status(201).json(processoResource(processoComRelacoes));

    } catch (error) {
        console.error('Erro no Store de Processo:', error);
        return res.status(500).json({ error: 'Erro ao criar processo' });
    }
};

exports.show = async (req, res) => {
    try {
        if (!processoPolicy.view(req.user, req.processo)) {
            return res.status(403).json({ error: 'Não autorizado' });
        }

        return res.status(200).json(processoResource(req.processo));
    } catch (error) {
        console.error('Erro no Show de Processo:', error);
        return res.status(500).json({ error: 'Erro ao procurar processo' });
    }
};

exports.update = async (req, res) => {
    try {
        if (!processoPolicy.update(req.user, req.processo)) {
            return res.status(403).json({ error: 'Não autorizado' });
        }

        const processo = await Processo.findByIdAndUpdate(
            req.processo._id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate(populateProcesso);

        return res.status(200).json(processoResource(processo));

    } catch (error) {
        console.error('Erro no Update de Processo:', error);
        return res.status(500).json({ error: 'Erro ao atualizar processo' });
    }
};

exports.destroy = async (req, res) => {
    try {
        if (!processoPolicy.delete(req.user, req.processo)) {
            return res.status(403).json({ error: 'Não autorizado' });
        }

        await Processo.findByIdAndDelete(req.processo._id);

        return res.status(200).json({ message: 'Processo removido com sucesso' });

    } catch (error) {
        console.error('Erro no Destroy de Processo:', error);
        return res.status(500).json({ error: 'Erro ao remover processo' });
    }
};